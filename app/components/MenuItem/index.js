import PropTypes from 'prop-types';
import MenuItem from 'antd';

function GlobalMenuItem(props) {
  return (
    <GlobalMenuItem
      key={props.key}
      icon={props.icon}
      title={props.title}
      disabled={props.disabled}
      danger={props.danger}
    />
  );
}

GlobalMenuItem.propTypes = {
  key: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  disabled: PropTypes.boolean,
  danger: PropTypes.boolean,
};

export default GlobalMenuItem;
