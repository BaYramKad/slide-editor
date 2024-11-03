import Slide from "../features/slide-containet";
import styles from "./app.module.scss";

function App() {
  return (
    <div className="container">
      <header className={styles.header}>
        <h1 className={styles.mainTitle}> Review and refine your slides</h1>
      </header>
      <Slide />
    </div>
  );
}

export default App;
