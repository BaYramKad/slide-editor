import styles from "../app/app.module.scss";
import { useAppDispatch, useAppSelector } from "../shared/hooks/store-hooks";
import {
  changeValueSelect,
  createBulet,
  deleteGroupBulets,
  groupBulets,
} from "../shared/store/create-bulet";
import { changeTitleSlide } from "../shared/store/create-slide";
import Block from "./block-container";
const Slide = () => {
  const slides = useAppSelector((state) => state.slide);
  const isSelected = useAppSelector((state) => state.bulet.isSelected);
  const dispath = useAppDispatch();

  const handleCreateBulet = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispath(createBulet({ type: "new-bulet", index: 0 }));
    }
  };

  const changeBehaviorBuletsList = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const valueSelect = (e.currentTarget as HTMLSelectElement).value;
    dispath(changeValueSelect(valueSelect));
    if (valueSelect === "heading") {
      dispath(groupBulets());
    } else {
      dispath(deleteGroupBulets());
    }
  };

  return (
    <main className={styles.main}>
      {slides.map((slide, index) => {
        return (
          <section key={index}>
            <span>Slide 1</span>
            <div className={styles.listEditors}>
              <input
                className={styles.inputSlide}
                autoFocus
                type="text"
                value={slide.title}
                placeholder="Add a title for your slide…"
                onChange={(e) =>
                  dispath(
                    changeTitleSlide({ id: slide.id, title: e.target.value })
                  )
                }
                onKeyDown={handleCreateBulet}
              />
              <Block />
            </div>

            <div className={styles.selectContainer}>
              <select
                onChange={(e) => changeBehaviorBuletsList(e)}
                value={isSelected}
                className={styles.select}
              >
                <option value="bulet">Bulet</option>
                <option value="heading">Heading</option>
              </select>
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default Slide;
