import { useAppDispatch, useAppSelector } from "../shared/hooks/store-hooks";
import {
  changeValueBulet,
  createBulet,
  focusOnBulet,
} from "../shared/store/create-bulet";
import styles from "../app/app.module.scss";
import { IBulet } from "../shared/types";
import { useEffect } from "react";

const Bulet = () => {
  const bulets = useAppSelector((state) => state.bulet.bulets);
  const isEmptyBulets = useAppSelector((state) => state.bulet.isEmptyBulets);
  const dispath = useAppDispatch();

  useEffect(() => {
    if (isEmptyBulets) {
      dispath(createBulet({ type: "new-subtitle", index: 0 }));
    }
  }, [isEmptyBulets]);

  const handleCreateBulet = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      dispath(createBulet({ type: "new-bulet", index }));
    }
  };

  const handleChangeBulet = ({ id, isHeadingBulet }: IBulet) => {
    dispath(focusOnBulet({ type: isHeadingBulet ? "heading" : "bulet", id }));
  };
  return (
    <ul>
      {bulets.map(({ id, title, isHeadingBulet }, index) => {
        return (
          <li key={id} className={isHeadingBulet ? styles.heading : ""}>
            <input
              autoFocus
              placeholder={
                isHeadingBulet
                  ? "Name your bullet list…"
                  : "Start your bullet list here..." 
              }
              onChange={(e) =>
                dispath(
                  changeValueBulet({
                    id,
                    value: e.target.value,
                  })
                )
              }
              value={title}
              
              onKeyDown={(e) => handleCreateBulet(e, index)}
              onClick={() => handleChangeBulet({ id, title, isHeadingBulet })}
              type="text"
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Bulet;
