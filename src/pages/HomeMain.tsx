import { useEffect, useState } from "react";
import { ICard } from "../utilities";
import Card from "../components/cards/Card";
import { useNavigate } from "react-router-dom";
import styles from "./Pages.module.scss";

function HomeMain() {
  const navigate = useNavigate();
  const [faq, setFAQ] = useState<ICard[]>([]);

  useEffect(() => {
    // Fetch project data from an API or any data source
    // Example: fetchProjects()
    // .then(data => setProjects(data))
    // .catch(error => console.error("Error fetching projects:", error));

    // Mock data for demonstration
    const mockFAQ: ICard[] = [
      {
        id: 1,
        title:
          "Learn to author accessible data visualizations with Explorable Alt Text",
        description: "Description of Card 1",
      },
      {
        id: 2,
        title: "Extract CSV with ChartDetective",
        description: "Description of Card 2",
      },
      {
        id: 3,
        title: "Types of charts supported",
        description: "Description of Card 3",
      },
    ];
    setFAQ(mockFAQ);
  }, []);

  return (
    <div className={styles.main}>
      {faq.map((faq) => (
        <Card
          key={faq.id}
          imageUrl="/placeholderimage.jpg"
          imageAltText="Card Image"
          title={faq.title}
          onCardClick={() => navigate(`/details/${faq.id}`)}
        >
          <p>{faq.description}</p>
        </Card>
      ))}
    </div>
  );
}

export default HomeMain;
