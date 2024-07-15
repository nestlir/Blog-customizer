import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleContextType = {
	stylesSelected: ArticleStateType;
	appliedStyles: ArticleStateType;
	setStylesSelected: (styles: ArticleStateType) => void;
	applyStyles: () => void;
	resetStyles: () => void;
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const useArticle = () => {
	const context = useContext(ArticleContext);
	if (!context) {
		throw new Error('useArticle must be used within an ArticleProvider');
	}
	return context;
};

type ArticleProviderProps = {
	children: ReactNode;
};

export const ArticleProvider = ({ children }: ArticleProviderProps) => {
	const [stylesSelected, setStylesSelected] = useState(defaultArticleState);
	const [appliedStyles, setAppliedStyles] = useState(defaultArticleState);

	const applyStyles = () => {
		console.log('Applying styles:', stylesSelected);
		setAppliedStyles(stylesSelected);
	};

	const resetStyles = () => {
		setStylesSelected(defaultArticleState);
		setAppliedStyles(defaultArticleState);
	};

	return (
		<ArticleContext.Provider
			value={{
				stylesSelected,
				appliedStyles,
				setStylesSelected,
				applyStyles,
				resetStyles,
			}}>
			{children}
		</ArticleContext.Provider>
	);
};
