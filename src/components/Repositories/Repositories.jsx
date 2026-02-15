import React, { useEffect, useState } from "react";
import "./Repositories.css";
import { getUserRepositories } from "../../api/github";
import { getUsername } from "../../config/config";

const Repositories = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const username = getUsername();
        getUserRepositories(username)
            .then((data) => {
                const sorted = data.sort((a, b) => b.updated_at - a.updated_at);
                setRepos(sorted);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading repositories...</div>;
    if (error) return <div>Failed to load repositories.</div>;

    return (
        <div className="repo-list">
            {repos.map((repo) => (
                <div key={repo.id} className="repo-card">
                    <h3>{repo.name}</h3>
                    {repo.description && <p>{repo.description}</p>}

                    <div className="repo-meta">
                        {repo.language && (
                            <span>
                                <span
                                    className="language-dot"
                                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                                />
                                {repo.language}
                            </span>
                        )}
                        {repo.stargazers_count > 0 && (
                            <span>⭐ {repo.stargazers_count}</span>
                        )}
                        {repo.forks_count > 0 && (
                            <span>🍴 {repo.forks_count}</span>
                        )}
                        <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

// GitHub language colors
const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
    PHP: "#4F5D95",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Swift: "#ffac45",
    Kotlin: "#A97BFF",
    Dart: "#00B4AB",
};

const getLanguageColor = (language) => languageColors[language] || "#586069";

export default Repositories;
