import { set } from 'idb-keyval';
import { getTodayKey } from '../utils';

export default app => {
  const save = state => {
    app.setState(state, () => {
      set('state', state);
    });
  }

  return {
    habits: {
      addHabit: () => {
        let {habits} = app.state;
        let name = prompt("What habit do you want to track?", "Meditate");
        habits.some(habit => habit === name) || save({...app.state, habits: habits.concat([name])});
      },
      removeHabit: (habit) => {
        let {habits} = app.state;
        let newHabits = habits.filter( el => el !== habit)
        save({...app.state, habits: newHabits})
      }
    },
    tracking: {
      trackHabit: (habit) => {
        let newDays = {...app.state.days};
        let today = getTodayKey();
        newDays[today] ? (newDays[today].some(el => habit === el) || newDays[today].push(habit) ) : (newDays[today] = [habit]);
        save({...app.state, days: newDays});
      },
      clearTracking: () => {
        save({...app.state, days: {}});
      }
    }
  }
}
