import React from "react"

export default function ComponentsList({
    components,
    getProject,
    loadingOptionCount,
    resetComponents
}) {
    const componentsListItems = components.map((component, index) => (
        <li key={`${component}-${index}`}>{component}</li>
    ))
    return (
        <section className="components-card">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">INVENTORY</p>
                    <h2>Components on hand</h2>
                </div>
                <span className="component-count">{components.length}</span>
            </div>
            <ul className="components-list" aria-live="polite">{componentsListItems}</ul>
            <div className="list-actions">
                <button className="reset-list-button" onClick={resetComponents}>
                    Reset list
                </button>
            </div>
            {components.length > 3 && <div className="get-project-container">
                <div className="project-prompt">
                    <h3>Ready for a project?</h3>
                    <p>Choose one detailed idea or compare three concise options.</p>
                </div>
                <div className="project-actions">
                    <button
                        onClick={() => getProject(1)}
                        disabled={loadingOptionCount !== null}
                    >
                        {loadingOptionCount === 1 ? "Generating..." : "One project"}
                    </button>
                    <button
                        onClick={() => getProject(3)}
                        disabled={loadingOptionCount !== null}
                    >
                        {loadingOptionCount === 3 ? "Generating..." : "Three options"}
                    </button>
                </div>
            </div>}
        </section>
    )
}