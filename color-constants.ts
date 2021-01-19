import { localize } from 'common/localization';

interface IColorPallete {
  id: string;
  label: string;
  color: string;
}

export const standerdColors: IColorPallete[] = [
  { id: 'a', label: 'ScienceBlue', color: '#0663B9' },
  { id: 'b', label: 'Dark Blue', color: '#1406B9' },
  { id: 'c', label: 'Purple', color: '#7506B9' },
  { id: 'd', label: 'Red Violet', color: '#B9069C' },
  { id: 'e', label: 'Lipstick', color: '#B9065C' },
  { id: 'f', label: 'Hot Toddy', color: '#B97C06' },
  { id: 'g', label: 'Buddha Gold', color: '#B9B206' },
  { id: 'h', label: 'Pistachio', color: '#8AB906' },
  { id: 'i', label: 'Limeade', color: '#4AB906' },
  { id: 'j', label: 'Pacific Blue', color: '#06AEB9' },
  { id: 'k', label: 'Blue Stone', color: '#00646A' },
  { id: 'l', label: 'Navy Blue', color: '#010569' },
  { id: 'm', label: 'Ripe Plum', color: '#340054' },
  { id: 'n', label: 'Black', color: '#000000' }
];

export const colorPaletteCells = standerdColors.map((x: IColorPallete) => {
  return (Object.assign({}, {
    ...x,
    label: localize(`ColorPicker.Color.${x.label.split(' ').join('')}`)
  }
  ));
});
