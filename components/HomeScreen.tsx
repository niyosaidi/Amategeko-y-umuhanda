import React from 'react';
import type { QuizCategory } from '../types';
import { VehicleIcon, SignsIcon, RulesIcon, AccidentsIcon } from './icons';

interface HomeScreenProps {
  onSelectCategory: (category: QuizCategory) => void;
}

const categories: {
  key: QuizCategory;
  title: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  {
    key: 'vehicle',
    title: 'Ikinyabiziga n’Ibikoresho byacyo',
    description: 'Fer, amatara, ibipimo, n’ibindi bya tekiniki.',
    Icon: VehicleIcon
  },
  {
    key: 'signs',
    title: 'Ibimenyetso byo mu Muhanda',
    description: 'Ibyapa, amatara, n’imirongo yo mu muhanda.',
    Icon: SignsIcon
  },
  {
    key: 'rules',
    title: 'Amategeko Rusange yo mu Muhanda',
    description: 'Umuvuduko, guhagarara, kunyuranaho, n’andi mategeko.',
    Icon: RulesIcon
  },
  {
    key: 'accidents',
    title: 'Impanuka, Imenyesha n’Ubutabazi',
    description: 'Isuzumwa, impanuka, n’ubutabazi bw’ibanze.',
    Icon: AccidentsIcon
  }
];

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectCategory }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto text-center">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">NS Traffic Academy</h1>
          <p className="text-slate-400 mt-2 text-lg">Hitamo icyiciro cy'ibibazo kugirango utangire kwiga.</p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(({ key, title, description, Icon }) => (
            <div key={key} className="bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-between transition-transform duration-300 hover:transform hover:-translate-y-2">
                <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-slate-700 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="text-slate-400 mt-1 text-sm">{description}</p>
                </div>
                <button
                onClick={() => onSelectCategory(key)}
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                >
                Tanga Ikizami
                </button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default HomeScreen;
