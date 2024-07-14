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
	const { appliedStyles } = useArticle();

	// Кастомные стили для статьи, основанные на примененных параметрах
	const customStyles = {
		'--font-family': appliedStyles.fontFamilyOption.value,
		'--font-size': appliedStyles.fontSizeOption.value,
		'--font-color': appliedStyles.fontColor.value,
		'--container-width': appliedStyles.contentWidth.value,
		'--bg-color': appliedStyles.backgroundColor.value,
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
