import React, { useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { useClose } from 'components/select/hooks/useClose';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useArticle } from 'src/context/ArticleContext';

import styles from './ArticleParamsForm.module.scss';

/**
 * Компонент формы для настройки параметров статьи.
 */
export const ArticleParamsForm = (): JSX.Element => {
	const { stylesSelected, setStylesSelected, applyStyles, resetStyles } =
		useArticle();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	const handleOnChange =
		(field: keyof typeof stylesSelected) => (value: OptionType) => {
			setStylesSelected({ ...stylesSelected, [field]: value });
		};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		applyStyles();
	};

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: ref,
	});

	return (
		<>
			<ArrowButton
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				state={isMenuOpen}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={ref}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={stylesSelected.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Open Sans'
						onChange={handleOnChange('fontFamilyOption')}
						title='шрифт'
					/>
					<RadioGroup
						selected={stylesSelected.fontSizeOption}
						name='fontSize'
						options={fontSizeOptions}
						onChange={handleOnChange('fontSizeOption')}
						title='размер шрифта'
					/>
					<Select
						selected={stylesSelected.fontColor}
						options={fontColors}
						placeholder='Черный'
						onChange={handleOnChange('fontColor')}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={stylesSelected.backgroundColor}
						options={backgroundColors}
						placeholder='Белый'
						onChange={handleOnChange('backgroundColor')}
						title='цвет фона'
					/>
					<Select
						selected={stylesSelected.contentWidth}
						options={contentWidthArr}
						placeholder='Широкий'
						onChange={handleOnChange('contentWidth')}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetStyles} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
