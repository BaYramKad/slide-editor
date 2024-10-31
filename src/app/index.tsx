import React, { useRef, useState } from "react";
import styles from "./app.module.scss";
import { useAppDispatch, useAppSelector } from "../shared/hooks/store-hooks";
import { addBulet, changeHeading, setValueBulet } from "../features/create-bulet";

function App() {
  const [value, setValue] = useState("");
  const [idBulet, setIdBulet] = useState(0); // Bulet
  console.log('idBulet: ', idBulet);

  const slides = useAppSelector((state) => state.slideData);
  console.log('slides: ', slides);
  const dispath = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleCreateBulet = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispath(addBulet());
      inputRef.current?.focus();
    }
  };

  const handleChangeBuletValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    dispath(setValueBulet({ id, value: event.target.value }));
  };



  return (
    <div className="container">
      <header className={styles.header}>
        <h1> Review and refine your slides</h1>
      </header>
      <main className={styles.main}>
        {slides.map(({ content_blocks }, index) => {
          return (
            <section key={index}>
              <span>Slide 1</span>
              <div>
                <input
                  className={styles.input}
                  autoFocus
                  type="text"
                  placeholder="Add a title for your slide…"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => handleCreateBulet(e)}
                />


                {/* <input type="text" className={styles.heading} value={content_blocks[0].heading} /> */}
                {content_blocks?.map(({bullets}, index) => {
                  
                  return (
                    <div key={index}>
                      <ul>
                        {bullets.map((item, index) => {
                          return (
                            <li key={index} className={item.isHeadingBulet ? styles.heading : ''}>
                              <input
                                autoFocus
                                ref={inputRef}
                                type="text"
                                value={item.title}
                                onChange={(e) =>
                                  handleChangeBuletValue(e, item.id)
                                }
                                onKeyDown={(e) => handleCreateBulet(e)}
                                onClick={() => setIdBulet(item.id)}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div className={styles.select}>
                <select
                  ref={selectRef}
                  onChange={() => dispath(changeHeading(idBulet))}
                >
                  <option value="bulet">Bulet</option>
                  <option value="heading">Heading</option>
                </select>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default App;
