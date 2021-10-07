import React from 'react';
import clsx from 'clsx';
import styles from './ListItem.module.scss';
const DrawerItem = ({ icon, title, active, onClick }) => (
	<li
		onClick={onClick}
		className={clsx(
			styles.drawelistItem,
			active === true ? styles.drawelistItemActive : ''
		)}
	>
		{icon}
		<p>{title}</p>
	</li>
);

export default DrawerItem;
