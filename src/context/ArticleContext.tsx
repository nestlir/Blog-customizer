import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleContextType = {
	stylesSelected: ArticleStateType;
	setStylesSelected: (styles: ArticleStateType) => void;
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

	const resetStyles = () => setStylesSelected(defaultArticleState);

	return (
		<ArticleContext.Provider
			value={{ stylesSelected, setStylesSelected, resetStyles }}>
			{children}
		</ArticleContext.Provider>
	);
};
