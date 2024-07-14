import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';
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

type FormStates = {
	onResetClick: () => void;
	onSubmitClick: (p: ArticleStateType) => void;
};

/**
 * Компонент формы для настройки параметров статьи.
 *
 * @param {FormStates} props - Свойства компонента, включающие функции для сброса и отправки формы.
 */
export const ArticleParamsForm = ({
	onResetClick,
	onSubmitClick,
}: FormStates) => {
	const [state, setState] = useState(defaultArticleState);
	const [isOpen, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	const handleOnChange =
		(field: keyof ArticleStateType) => (value: OptionType) =>
			setState((prevState) => ({ ...prevState, [field]: value }));

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmitClick(state);
	};

	const handleResetStyles = () => {
		onResetClick();
		setState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		onChange: () => setOpen(false),
		rootRef: ref,
	});

	return (
		<>
			<ArrowButton onClick={() => setOpen(!isOpen)} state={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={ref}>
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
