// Default configuration
export const config = {
    defaultUsername: 'shreeramk',
    githubApiBaseUrl: 'https://api.github.com',
    contributionsApiUrl: 'https://github-contributions-api.jogruber.de/v4'
};

// Get username from URL query params or use default
export const getUsername = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const usernameParam = urlParams.get('username');
    return usernameParam || config.defaultUsername;
};
