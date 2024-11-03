export interface IBulet {
  id: number;
  title: string;
  isHeadingBulet: boolean;
}

export interface IBuletMain {
  id: number;
  isSelected: string;
  isEmptyBulets: boolean;
  bulets: IBulet[];
  content_blocks: IContentBlock[];
}

export interface IContentBlock {
  id: number;
  heading: string;
  bulets: IBulet[];
}

export interface IBlockElements {
  id: string;
  heading: string;
  bullets: IBulet[];
}

export interface ISlide {
  id: number;
  title: string;
  content_blocks: IBlockElements[];
}

export interface SelectState {
  isHeading: boolean;
  currentBulet: IBulet[];
}
