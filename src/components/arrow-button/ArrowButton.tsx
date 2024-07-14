import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type ArrowButtonProps = {
	onClick: OnClick;
	state: boolean;
};

export type OnClick = () => void;

export const ArrowButton = (props: ArrowButtonProps) => {
	const { onClick, state } = props;

	const arrowButtonStyle = clsx(styles.container, {
		[styles.container_open]: state,
	});

	const arrowImgStyle = clsx(styles.arrow, {
		[styles.arrow_open]: state,
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={arrowButtonStyle}>
			<img src={arrow} alt='иконка стрелочки' className={arrowImgStyle} />
		</div>
	);
};
