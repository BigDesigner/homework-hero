import { GoogleSignIn } from '@capawesome/capacitor-google-sign-in';

export const googleAuthService = {
  /**
   * Initializes the Google Sign-In plugin
   */
  async initialize() {
    await GoogleSignIn.initialize({
      clientId: '1072553767565-8s7ipjb84k5jsrhd2k982qti61pva8oi.apps.googleusercontent.com',
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive.appdata'],
      redirectUrl: window.location.origin
    });
  },

  /**
   * Performs Google Sign-In and returns user info + tokens
   */
  async signIn() {
    try {
      const result = await GoogleSignIn.signIn();
      console.log('Google Sign-In Success:', result);
      
      const auth = result?.authentication || {};
      
      const userData = {
        id: result?.user?.id || result?.id,
        email: result?.user?.email || result?.email,
        name: result?.user?.name || result?.name || result?.displayName || 'Kahraman',
        imageUrl: result?.user?.imageUrl || result?.imageUrl,
        idToken: auth.idToken,
        accessToken: auth.accessToken
      };

      return {
        success: true,
        user: userData
      };
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  /**
   * Signs out the user from Google
   */
  async signOut() {
    try {
      await GoogleSignIn.signOut();
      return { success: true };
    } catch (error) {
      console.error('Google Sign-Out Error:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Refresh session if possible
   */
  async refresh() {
    try {
      // Some plugins handle this automatically or provide a refresh method.
      // For now, we'll return the current state.
    } catch (error) {
      console.error('Refresh Error:', error);
    }
  }
};
