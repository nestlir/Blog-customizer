import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

// Инициализация корневого элемента для рендеринга React
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

/**
 * Основной компонент приложения.
 *
 * @returns {JSX.Element} Корневой элемент приложения.
 */
const App = () => {
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

// Рендеринг корневого компонента в StrictMode
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
