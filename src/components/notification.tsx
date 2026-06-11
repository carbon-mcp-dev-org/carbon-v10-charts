import React, { useContext } from 'react';
import { InlineNotification, ActionableNotification } from '@carbon/react';
import {
	NotificationContext,
	NotificationActionType,
	NotificationData
} from '../context/notification-context';
import { css } from 'emotion';

const notificationStyle = { minWidth: '30rem' };

const notificationAreaStyle = css`
	left: 50%;
	transform: translateX(-50%);
	position: absolute;
	z-index: 2;
	min-width: 30rem;
	top: 2rem;
`;

export const Notification = () => {
	const [state, dispatch] = useContext(NotificationContext);
	return (
		<div className={notificationAreaStyle} role="alert">
			{state.notifications.map((notification: NotificationData, index: number) => {
				if (notification.action) {
					return (
						<ActionableNotification
							lowContrast
							aria-live="assertive"
							kind={notification.kind as "error" | "info" | "info-square" | "success" | "warning" | "warning-alt"}
							title={notification.title}
							subtitle={notification.message}
							key={notification.id}
							actionButtonLabel={notification.action.actionText}
							onActionButtonClick={() => {
								notification.action.actionFunction();
								dispatch({
									type: NotificationActionType.REMOVE_NOTIFICATION,
									data: notification
								});
							}}
							onCloseButtonClick={() => {
								notification.action.onNotificationClose();
								dispatch({
									type: NotificationActionType.REMOVE_NOTIFICATION,
									data: notification
								});
							}}
							style={notificationStyle}
						/>
					);
				}
				return (
					<InlineNotification
						lowContrast
						aria-live="assertive"
						kind={notification.kind as "error" | "info" | "info-square" | "success" | "warning" | "warning-alt"}
						title={notification.title}
						subtitle={notification.message}
						key={notification.id}
						onCloseButtonClick={() => {
							dispatch({
								type: NotificationActionType.REMOVE_NOTIFICATION,
								data: notification
							});
						}}
						style={notificationStyle}
					/>
				);
			})}
		</div>
	);
};
