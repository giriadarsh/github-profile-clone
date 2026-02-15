import { config } from '../config/config';

/**
 * Fetch user profile data from GitHub API
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} User data
 */
export const getUserData = async (username) => {
    try {
        const response = await fetch(`${config.githubApiBaseUrl}/users/${username}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

/**
 * Fetch user repositories from GitHub API
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} Array of repositories
 */
export const getUserRepositories = async (username) => {
    try {
        const response = await fetch(
            `${config.githubApiBaseUrl}/users/${username}/repos?sort=updated&per_page=20`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch repositories: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
};

/**
 * Fetch user contributions data
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} Contributions data
 */
export const getUserContributions = async (username) => {
    try {
        const response = await fetch(`${config.contributionsApiUrl}/${username}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch contributions: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching contributions:', error);
        throw error;
    }
};
