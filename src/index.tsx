import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './components/app/App'; // Импортируем компонент App

import './styles/index.scss';

// Инициализация корневого элемента для рендеринга React
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// Рендеринг корневого компонента в StrictMode
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
