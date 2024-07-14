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

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [stylesSelected, setStylesSelected] = useState(defaultArticleState);

	const handleFormSubmit = (selectedStyles: ArticleStateType) => {
		setStylesSelected(selectedStyles);
	};

	const handleResetStyles = () => {
		setStylesSelected(defaultArticleState);
	};

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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
