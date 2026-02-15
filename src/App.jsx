import React, { useState } from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Repositories from "./components/Repositories/Repositories";
import Contributions from "./components/Contributions/Contributions";
import PopularRepos from "./components/PopularRepos/PopularRepos";
import "./styles.css";

const App = () => {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <>
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="container">
                <div className="layout">
                    <Sidebar />
                    <div className="main">
                        {activeTab === "overview" && (
                            <>
                                <PopularRepos />
                                <Contributions />
                            </>
                        )}
                        {activeTab === "repos" && <Repositories />}
                        {activeTab === "projects" && <div>Projects coming soon.</div>}
                        {activeTab === "packages" && <div>Packages coming soon.</div>}
                        {activeTab === "stars" && <div>Stars coming soon.</div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
