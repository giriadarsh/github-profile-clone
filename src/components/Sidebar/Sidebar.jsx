import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { getUserData } from "../../api/github";
import { getUsername } from "../../config/config";

const Sidebar = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const username = getUsername();
        getUserData(username)
            .then((data) => {
                setUser(data);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) return <aside className="sidebar">Loading...</aside>;
    if (error) return <aside className="sidebar">Something went wrong.</aside>;

    return (
        <aside className="sidebar">
            <img className="avatar" src={user.avatar_url} alt="profile" />

            <h2 className="name">{user.name}</h2>
            <p className="username">{user.login}</p>

            {user.bio && <p className="bio">{user.bio}</p>}

            <button className="edit-btn">Edit profile</button>

            <div className="follow-info">
                <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.6 }}>
                    <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
                </svg>
                <span>
                    <strong>{user.followers}</strong> followers
                </span>
                <span>·</span>
                <span>
                    <strong>{user.following}</strong> following
                </span>
            </div>

            <hr className="divider" />

            <div className="achievements-section">
                <h3 className="achievements-title">Achievements</h3>
                <div className="achievement-badges">
                    <div className="achievement-badge">
                        <img
                            src="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png"
                            alt="Achievement badge"
                            className="badge-image"
                        />
                    </div>
                </div>
            </div>

            <hr className="divider" />

            <div className="user-details">
                {user.company && (
                    <div className="detail-item">
                        <span className="icon">🏢</span>
                        <span>{user.company}</span>
                    </div>
                )}
                {user.location && (
                    <div className="detail-item">
                        <span className="icon">📍</span>
                        <span>{user.location}</span>
                    </div>
                )}
                {user.email && (
                    <div className="detail-item">
                        <span className="icon">✉️</span>
                        <span>{user.email}</span>
                    </div>
                )}
                {user.blog && (
                    <div className="detail-item">
                        <span className="icon">🔗</span>
                        <a href={user.blog} target="_blank" rel="noopener noreferrer">
                            {user.blog}
                        </a>
                    </div>
                )}
                {user.twitter_username && (
                    <div className="detail-item">
                        <span className="icon">🐦</span>
                        <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
                            @{user.twitter_username}
                        </a>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
