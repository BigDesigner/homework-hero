export const driveService = {
  FILE_NAME: 'homework_hero_data.json',
  BOUNDARY: '-------314159265358979323846',

  async findFile(accessToken) {
    const url = `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name='${this.FILE_NAME}'&fields=files(id, name, modifiedTime)`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!response.ok) throw new Error('Failed to find backup file');
    const data = await response.json();
    return data.files.length > 0 ? data.files[0] : null;
  },

  async readFile(accessToken, fileId) {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!response.ok) throw new Error('Failed to read backup file');
    return await response.json();
  },

  async createFile(accessToken, data) {
    const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
    const metadata = {
      name: this.FILE_NAME,
      parents: ['appDataFolder']
    };

    const multipartRequestBody =
      `\r\n--${this.BOUNDARY}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n` +
      JSON.stringify(metadata) +
      `\r\n--${this.BOUNDARY}\r\nContent-Type: application/json\r\n\r\n` +
      JSON.stringify(data) +
      `\r\n--${this.BOUNDARY}--`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${this.BOUNDARY}`,
        'Content-Length': multipartRequestBody.length.toString()
      },
      body: multipartRequestBody
    });
    if (!response.ok) throw new Error('Failed to create backup file');
    return await response.json();
  },

  async updateFile(accessToken, fileId, data) {
    const url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update backup file');
    return await response.json();
  },

  /**
   * Merges local and remote data.
   * - Missions: Union of both. If conflict, completed status wins.
   * - User: Prefer remote if it exists to keep devices in sync, but this can be customized.
   */
  mergeData(localData, remoteData) {
    const mergedMissionsMap = new Map();
    
    // Add remote missions first
    (remoteData.missions || []).forEach(m => mergedMissionsMap.set(m.id, m));
    
    // Merge local missions
    (localData.missions || []).forEach(localM => {
      const remoteM = mergedMissionsMap.get(localM.id);
      if (remoteM) {
        // Conflict resolution: if one is completed, prefer it
        if (localM.completed && !remoteM.completed) {
          mergedMissionsMap.set(localM.id, localM);
        }
      } else {
        mergedMissionsMap.set(localM.id, localM);
      }
    });

    const mergedMissions = Array.from(mergedMissionsMap.values());
    
    // Sort missions: active first (by date), then completed (by newest id)
    mergedMissions.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      if (!a.completed) return new Date(a.dueDate + "T00:00:00") - new Date(b.dueDate + "T00:00:00");
      return b.id - a.id;
    });

    return {
      user: localData.user, // Let local user state take precedence during sync to avoid unexpected UI changes
      missions: mergedMissions,
      lastSync: new Date().toISOString()
    };
  },

  /**
   * Main sync function
   */
  async syncData(localData, accessToken) {
    try {
      const file = await this.findFile(accessToken);
      
      if (!file) {
        // No backup exists, create one with local data
        const initialData = { ...localData, lastSync: new Date().toISOString() };
        await this.createFile(accessToken, initialData);
        return { success: true, data: initialData, message: 'created' };
      }

      // Backup exists, read and merge
      const remoteData = await this.readFile(accessToken, file.id);
      const mergedData = this.mergeData(localData, remoteData);
      
      // Update remote with merged data
      await this.updateFile(accessToken, file.id, mergedData);
      
      return { success: true, data: mergedData, message: 'merged' };
    } catch (error) {
      console.error('Drive Sync Error:', error);
      return { success: false, error: error.message };
    }
  }
};
