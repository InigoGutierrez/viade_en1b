import React from "react";
import "./Settings.css";
import { DropdownButton, Dropdown,  ToggleButton, ButtonGroup } from "react-bootstrap";
import { connect } from 'react-redux';
import changeLocale from '../../../store/actions/localeAction';

export  function Settings(props) {

    const {changeTheme} = props;


    return(
        <div className="GeneralComponent">
            <h2 data-testid="settings-title"> Settings </h2>
            <h1 data-testid="settings-themes"> Themes</h1>
            <ButtonGroup toggle  >
                <ToggleButton data-testid="settings-theme-normal" type="radio" name="radio" defaultChecked value="Normal" onClick={() => changeTheme("normal")}>
                    Normal
                    </ToggleButton>
                <ToggleButton data-testid="settings-theme-dark" type="radio" name="radio" value="Dark" onClick={() => changeTheme("dark")}>
                    Dark
                </ToggleButton>
                <ToggleButton data-testid="settings-theme-blind" type="radio" name="radio" value="Colorblind" onClick={() => changeTheme("blind")}>
                    Colorblind
                </ToggleButton>

            </ButtonGroup>
            <h1 data-testid="settings-language"> Language </h1>
            <DropdownButton data-testid="settings-language-dropdown" id="dropdown-basic-button" title="Available Languages">
                <Dropdown.Item data-testid="settings-language-english" onClick={() => props.changeLanguage("en")}  href="#"> English</Dropdown.Item>
                <Dropdown.Item data-testid="settings-language-spanish" onClick={() => props.changeLanguage("es")} href="#"> Spanish </Dropdown.Item>
            </DropdownButton>
        </div>
    );

}
const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (locale) => dispatch(changeLocale(locale))
    };
  };
export default connect(null,mapDispatchToProps)(Settings)
