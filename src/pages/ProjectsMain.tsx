import { useEffect, useState } from "react";
import { ICard } from "../utilities";
import Card from "../components/cards/Card";
import { Link } from "react-router-dom";
import styles from "./Pages.module.scss";

function ProjectsMain() {
  const [projects, setProjects] = useState<ICard[]>([]);

  useEffect(() => {
    // Fetch project data from an API or any data source
    // Example: fetchProjects()
    // .then(data => setProjects(data))
    // .catch(error => console.error("Error fetching projects:", error));

    // Mock data for demonstration
    const mockProjects: ICard[] = [
      { id: 1, title: "Project 1", description: "Description of Project 1" },
      { id: 2, title: "Project 2", description: "Description of Project 2" },
      { id: 3, title: "Project 3", description: "Description of Project 3" },
    ];
    setProjects(mockProjects);
  }, []);

  return (
    <div className={styles.main}>
      {projects.map((project) => (
        <Card
          key={project.id}
          imageUrl="/placeholderimage.jpg"
          imageAltText="Card Image"
          title={project.title}
          buttons={[
            <Link key="open" to={`/projects/${project.id}`}>
              Open
            </Link>,
          ]}
        >
          <p>{project.description}</p>
        </Card>
      ))}
    </div>
  );
}

export default ProjectsMain;
