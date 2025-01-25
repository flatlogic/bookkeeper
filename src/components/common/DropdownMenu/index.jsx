import React from 'react';
import Menu from '@material-ui/core/Menu';

class DropdownMenu extends React.PureComponent {
  onClose = () => {
    this.props.onClose();
  };

  render() {
    const { open, anchorRef, children } = this.props;

    return (
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        id="customized-menu"
        anchorEl={anchorRef}
        // keepMounted
        open={open}
        onClose={this.onClose}
        variant="menu"
      >
        {children}
      </Menu>
    );
  }
}

export default DropdownMenu;