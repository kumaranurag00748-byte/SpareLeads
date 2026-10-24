import React from "react"
import ComponentsList from "./ComponentsList"
import Response from "./Response"
import { getProjectFromGemini } from "../ai"

export default function Main() {
    const [components, setComponents] = React.useState([])
    const [project, setProject] = React.useState("")
    const [loadingOptionCount, setLoadingOptionCount] = React.useState(null)
    const [error, setError] = React.useState("")

    async function getProject(optionCount) {
        setLoadingOptionCount(optionCount)
        setError("")

        try {
            const projectMarkdown = await getProjectFromGemini(components, optionCount)
            setProject(projectMarkdown)
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unable to generate a project.")
        } finally {
            setLoadingOptionCount(null)
        }
    }

    function addComponent(formData) {
        const newComponent = formData.get("component")?.trim()
        if (newComponent) {
            setComponents(prevComponents => [...prevComponents, newComponent])
        }
    }

    function resetComponents() {
        setComponents([])
    }

    return (
        <main>
            <div className="main-content">
                <section className="intro">
                    <p className="eyebrow">BUILD SOMETHING USEFUL</p>
                    <h1>Turn spare components into a project.</h1>
                    <p className="intro-copy">
                        Add the parts you have and get a practical electronics project
                        idea tailored to your component list.
                    </p>
                </section>

                <form action={addComponent} className="add-component-form">
                    <label htmlFor="component">Your components</label>
                    <div className="form-controls">
                        <input
                            id="component"
                            type="text"
                            placeholder="e.g. LED, resistor, Arduino"
                            aria-label="Add component"
                            name="component"
                        />
                        <button>Add component</button>
                    </div>
                </form>

                {components.length > 0 &&
                    <ComponentsList
                        components={components}
                        getProject={getProject}
                        loadingOptionCount={loadingOptionCount}
                        resetComponents={resetComponents}
                    />
                }

                {error && <p className="error-message" role="alert">{error}</p>}
                {project && <Response response={project} />}
            </div>
        </main>
    )
}