import React, { useEffect, useState } from "react";
import "./PopularRepos.css";
import { getUserRepositories } from "../../api/github";
import { getUsername } from "../../config/config";

const PopularRepos = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const username = getUsername();
        getUserRepositories(username)
            .then((data) => {
                // Get top 6 repos by stars
                const popular = data
                    .sort((a, b) => b.stargazers_count - a.stargazers_count)
                    .slice(0, 6);
                setRepos(popular);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (repos.length === 0) return null;

    return (
        <div className="popular-repos-section">
            <h2 className="section-title">Popular repositories</h2>
            <div className="popular-repos-grid">
                {repos.map((repo) => (
                    <div key={repo.id} className="popular-repo-card">
                        <h3>{repo.name}</h3>
                        {repo.description && <p>{repo.description}</p>}

                        <div className="popular-repo-meta">
                            {repo.language && (
                                <span className="language">
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
                        </div>
                    </div>
                ))}
            </div>
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

export default PopularRepos;
