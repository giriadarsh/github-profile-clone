import React, { useEffect, useState } from "react";
import "./Contributions.css";
import { getUserContributions } from "../../api/github";
import { getUsername } from "../../config/config";

const Contributions = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // First useEffect - fetch data
    useEffect(() => {
        const username = getUsername();
        getUserContributions(username)
            .then((responseData) => {
                setData(responseData);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    // Process data to get years (needed for second useEffect)
    const contributions = data?.contributions || [];
    const contributionsByYear = {};
    contributions.forEach(day => {
        const year = new Date(day.date).getFullYear();
        if (!contributionsByYear[year]) {
            contributionsByYear[year] = [];
        }
        contributionsByYear[year].push(day);
    });
    const years = Object.keys(contributionsByYear).map(Number).sort((a, b) => b - a);

    // Second useEffect - set default year (MUST be before conditional returns)
    useEffect(() => {
        if (years.length > 0 && !years.includes(selectedYear)) {
            setSelectedYear(years[0]);
        }
    }, [years, selectedYear]);

    // NOW we can do conditional returns AFTER all hooks
    if (loading) return <div className="contributions-section">Loading contributions...</div>;
    if (!data) return null;

    // Get contributions for selected year
    const yearContributions = contributionsByYear[selectedYear] || [];
    const yearTotal = yearContributions.reduce((sum, day) => sum + day.count, 0);

    // Group into weeks
    const weeks = [];
    for (let i = 0; i < yearContributions.length; i += 7) {
        weeks.push(yearContributions.slice(i, i + 7));
    }

    // Get month labels
    const getMonthLabels = () => {
        const months = [];
        let lastMonth = '';

        weeks.forEach((week, weekIndex) => {
            if (week[0]) {
                const date = new Date(week[0].date);
                const monthName = date.toLocaleDateString('en-US', { month: 'short' });

                if (monthName !== lastMonth && weekIndex % 4 === 0) {
                    months.push({ month: monthName, index: weekIndex });
                    lastMonth = monthName;
                }
            }
        });

        return months;
    };

    const monthLabels = getMonthLabels();
    const totalContributions = data.total?.lastYear || contributions.reduce((sum, day) => sum + day.count, 0);

    return (
        <div className="contributions-section">
            <div className="contributions-container">
                <div className="contributions-header">
                    <h2 className="contributions-title">
                        {selectedYear === new Date().getFullYear()
                            ? `${totalContributions.toLocaleString()} contributions in the last year`
                            : `${yearTotal.toLocaleString()} contributions in ${selectedYear}`
                        }
                    </h2>

                    <div className="contribution-settings">
                        <span className="settings-link">Contribution settings</span>
                    </div>
                </div>

                <div className="contributions-content">
                    <div className="contributions-wrapper">
                        <div className="contributions-graph-container">
                            {/* Month labels */}
                            <div className="month-labels">
                                {monthLabels.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="month-label"
                                        style={{ left: `${30 + (item.index * 13)}px` }}
                                    >
                                        {item.month}
                                    </div>
                                ))}
                            </div>

                            {/* Graph with day labels */}
                            <div className="graph-with-labels">
                                {/* Day labels */}
                                <div className="day-labels">
                                    <div className="day-label"></div>
                                    <div className="day-label">Mon</div>
                                    <div className="day-label"></div>
                                    <div className="day-label">Wed</div>
                                    <div className="day-label"></div>
                                    <div className="day-label">Fri</div>
                                    <div className="day-label"></div>
                                </div>

                                {/* Contribution grid */}
                                <div className="contributions-grid">
                                    {weeks.map((week, weekIndex) => (
                                        <div key={weekIndex} className="week-column">
                                            {week.map((day, dayIndex) => (
                                                <div
                                                    key={dayIndex}
                                                    className="contribution-cell"
                                                    style={{ backgroundColor: getColor(day.level) }}
                                                    title={`${day.count} contributions on ${day.date}`}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Learn link */}
                            <div className="learn-link-container">
                                <a href="#" className="learn-link">Learn how we count contributions</a>
                            </div>
                        </div>

                        <div className="contributions-footer">
                            <div className="contributions-legend">
                                <span>Less</span>
                                {[0, 1, 2, 3, 4].map(level => (
                                    <div
                                        key={level}
                                        className="legend-cell"
                                        style={{ backgroundColor: getColor(level) }}
                                    />
                                ))}
                                <span>More</span>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            {/* Year selector sidebar */}
            <div className="year-selector-sidebar">
                {years.map(year => (
                    <div
                        key={year}
                        className={`year-link ${year === selectedYear ? 'active' : ''}`}
                        onClick={() => setSelectedYear(year)}
                    >
                        {year}
                    </div>
                ))}
            </div>
        </div>
    );
};

const colors = [
    "#161b22",
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353",
];

const getColor = (level) => colors[level] || colors[0];

export default Contributions;
