import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Тип для функции обработчика клика */
export type OnClick = () => void;

/** Пропсы для компонента ArrowButton */
export type ArrowButtonProps = {
	onClick: OnClick; // Функция для обработки клика
	state: boolean; // Состояние открытия/закрытия
};

/**
 * Компонент кнопки со стрелкой для открытия/закрытия формы
 *
 * @param {ArrowButtonProps} props - Свойства компонента
 * @returns {JSX.Element} JSX элемент кнопки со стрелкой
 */
export const ArrowButton = (props: ArrowButtonProps): JSX.Element => {
	const { onClick, state } = props;

	// Стиль контейнера кнопки, изменяется в зависимости от состояния
	const arrowButtonStyle = clsx(styles.container, {
		[styles.container_open]: state,
	});

	// Стиль иконки стрелки, изменяется в зависимости от состояния
	const arrowImgStyle = clsx(styles.arrow, {
		[styles.arrow_open]: state,
	});

	return (
		// Указываем role и aria-label атрибуты для интерактивных элементов
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
