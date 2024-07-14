import React from 'react';
import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import { useArticle } from 'src/context/ArticleContext';
import 'src/styles/index.scss';
import styles from 'src/styles/index.module.scss';

/**
 * Основной компонент приложения.
 *
 * @returns {JSX.Element} Корневой элемент приложения.
 */
export const App = (): JSX.Element => {
	const { stylesSelected } = useArticle();

	// Кастомные стили для статьи, основанные на состоянии
	const customStyles = {
		'--font-family': stylesSelected.fontFamilyOption.value,
		'--font-size': stylesSelected.fontSizeOption.value,
		'--font-color': stylesSelected.fontColor.value,
		'--container-width': stylesSelected.contentWidth.value,
		'--bg-color': stylesSelected.backgroundColor.value,
	} as React.CSSProperties;

	return (
		<div style={customStyles}>
			<ArticleParamsForm />
			<main className={styles.main}>
				<Article />
			</main>
		</div>
	);
};
