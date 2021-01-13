import { Menu } from 'antd';
import PropTypes from 'prop-types';

function GlobalMenu(props) {
  return (
    <Menu theme={props.theme} mode={props.mode} key={props.key}>
      {props.children}
    </Menu>
  );
}
GlobalMenu.propTypes = {
  theme: PropTypes.string,
  mode: PropTypes.string,
  key: PropTypes.string,
};

export default GlobalMenu;
