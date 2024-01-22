import { Trans } from 'react-i18next';

const CustomTrans: typeof Trans = ({ ...args }) => {
  return (
    <Trans
      {...args}
      components={{
        ...args.components,
        br: <br />,
      }}
    />
  );
};

export default CustomTrans;
