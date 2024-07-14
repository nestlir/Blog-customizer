import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';

type FormStates = {
	onResetClick: () => void;
	onSubmitClick: (p: ArticleStateType) => void;
};

/**
 * Компонент формы для настройки параметров статьи.
 *
 * @param {FormStates} props - Свойства компонента, включающие функции для сброса и отправки формы.
 */
export const ArticleParamsForm = (props: FormStates) => {
	const { onResetClick, onSubmitClick } = props;

	const [state, setState] = useState(defaultArticleState); // Состояние формы с параметрами статьи

	/**
	 * Обработчик изменения значения в форме.
	 *
	 * @param {keyof ArticleStateType} field - Поле, которое изменяется.
	 * @returns {function} Функция для обновления состояния формы.
	 */
	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	/**
	 * Обработчик отправки формы.
	 *
	 * @param {React.FormEvent<HTMLFormElement>} event - Событие отправки формы.
	 */
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmitClick(state);
	};

	/**
	 * Обработчик сброса параметров стилей.
	 */
	const handleResetStyles = () => {
		onResetClick();
		setState(defaultArticleState);
	};

	const [isOpen, setOpen] = useState(false); // Состояние открытия/закрытия меню
	const ref = useRef<HTMLDivElement | null>(null); // Ссылка на элемент меню

	/**
	 * Обработчик клика по кнопке открытия/закрытия меню.
	 */
	const handleClick = () => {
		return setOpen(!isOpen);
	};

	/**
	 * Обработчик закрытия меню.
	 */
	const handleClose = () => {
		setOpen(false);
	};

	useOutsideClickClose({
		isOpen,
		onChange: handleClose,
		rootRef: ref,
	});

	const asideContainerStyle = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	return (
		<>
			<ArrowButton onClick={handleClick} state={isOpen} />
			<aside className={asideContainerStyle} ref={ref}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Open Sans'
						onChange={handleOnChange('fontFamilyOption')}
						title='шрифт'
					/>
					<RadioGroup
						selected={state.fontSizeOption}
						name='fontSize'
						options={fontSizeOptions}
						onChange={handleOnChange('fontSizeOption')}
						title='размер шрифта'
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						placeholder='Черный>'
						onChange={handleOnChange('fontColor')}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						placeholder='Белый>'
						onChange={handleOnChange('backgroundColor')}
						title='цвет фона'
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						placeholder='Широкий'
						onChange={handleOnChange('contentWidth')}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetStyles} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
