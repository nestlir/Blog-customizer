import { useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import 'src/styles/index.scss';
import styles from './App.module.scss';

/**
 * Основной компонент приложения.
 *
 * @returns {JSX.Element} Корневой элемент приложения.
 */
export const App = (): JSX.Element => {
	const [stylesSelected, setStylesSelected] = useState(defaultArticleState); // Состояние для выбранных стилей статьи

	/**
	 * Обработчик отправки формы для обновления стилей статьи.
	 *
	 * @param {ArticleStateType} selectedStyles - Выбранные стили статьи.
	 */
	const handleFormSubmit = (selectedStyles: ArticleStateType) => {
		setStylesSelected(selectedStyles);
	};

	/**
	 * Обработчик сброса стилей статьи к значениям по умолчанию.
	 */
	const handleResetStyles = () => {
		setStylesSelected(defaultArticleState);
	};

	// Кастомные стили для статьи, основанные на состоянии
	const customStyles = {
		'--font-family': stylesSelected.fontFamilyOption.value,
		'--font-size': stylesSelected.fontSizeOption.value,
		'--font-color': stylesSelected.fontColor.value,
		'--container-width': stylesSelected.contentWidth.value,
		'--bg-color': stylesSelected.backgroundColor.value,
	} as React.CSSProperties;

	return (
		<div className={clsx(styles.main)} style={customStyles}>
			<ArticleParamsForm
				onSubmitClick={handleFormSubmit}
				onResetClick={handleResetStyles}
			/>
			<Article />
		</div>
	);
};
