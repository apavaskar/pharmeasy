import React from 'react';
import classNames from 'classnames';
import AppMenuComponent from './AppMenuComponent';
import { Ripple } from 'primereact/ripple';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { selectAuth } from '../../redux/selectors/authSelector';


const AppTopbar = (props) => {
    console.log(	window);

	let topbarMenuClassName = classNames('layout-profile-menu fadeInDown ', { 'layout-profile-menu-active': props.topbarUserMenuActive });
	let menuButtonClassName = classNames('layout-menubutton ', { 'layout-menubutton-active': props.menuActive })

	const getInk = (el) => {
        for (let i = 0; i < el.children.length; i++) {
            if (typeof el.children[i].className === 'string' && el.children[i].className.indexOf('p-ink') !== -1) {
                return el.children[i];
            }
        }
        return null;
	}

	const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

	const onItemClick = (event) => {
		const ink = getInk(event.currentTarget);
		if (ink) {
			removeClass(ink, 'p-ink-active');
		}
        window.location = '/';
	}

	return (
		<div className="layout-topbar">
			<button type="button" className={menuButtonClassName} onClick={props.onMenuButtonClick}>
				<div className="layout-menubutton-icon" />
			</button>

			<div className="layout-topbar-grid">
				<div className="layout-topbar-grid-column layout-topbar-grid-column-fixed">
					<button type="button" className="layout-logo p-link" onClick={() => { window.location = "/#" }}>
						<img src="assets/layout/images/logo-white.svg" alt="sapphire-layout" />
					</button>
				</div>

				<div className="layout-topbar-grid-column">
					<AppMenuComponent model={props.model} horizontal={props.horizontal} menuHoverActive={props.menuHoverActive} isMobile={props.isMobile}
						onMenuItemClick={props.onMenuItemClick} onRootMenuItemClick={props.onRootMenuItemClick} onSidebarClick={props.onSidebarClick} />
				</div>


				<div className="layout-topbar-grid-column layout-topbar-grid-column-fixed">
				</div>

				<div className="layout-topbar-grid-column layout-topbar-grid-column-fixed">
					<button type="button" className="p-link profile-menu-button" onClick={props.onTopbarUserMenuButtonClick}>
						<span>{props.auth.profile.employee.name}</span>
                        <p><span>{props.auth.profile.location.name}</span></p>
					</button>
					<ul className={topbarMenuClassName} onClick={props.onTopbarUserMenuClick}>
						<li role="menuitem">
							<button type="button" className="p-link p-ripple" onClick={onItemClick}>
								<i className="pi pi-times"></i>
								<span>Logout</span>
                                <Ripple />
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

AppTopbar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapState = (state) => {
    const auth = selectAuth(state);
    return {auth};
};

const actions = {

};

export default connect(mapState, actions)(AppTopbar);
