export type FlexConfigurations = {
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  align?: 'center' | 'flex-start' | 'flex-end';
  gap?: number;
  reverse?: boolean;
  fill?: boolean;
};
