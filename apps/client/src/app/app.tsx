// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import './app.css';
import gameController from './gameController';

export function App() {
  return (
    <div>
      <h1 className="game_title">Turn-Based Combat Game</h1>
      <main>
        <div className="join_match_container">
          <button
            className="join_match_button"
            onClick={() => gameController.JoinMatch()}
          >
            Join Match
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
