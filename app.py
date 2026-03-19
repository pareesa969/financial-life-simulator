import streamlit as st

from backend.scenario_manager import get_game_scenarios
from backend.game_engine import apply_decision
from utils.score_calculator import calculate_final_score, evaluate_score


# ---------- INITIALIZE SESSION ----------

if "game_started" not in st.session_state:
    st.session_state.game_started = False

if "current_scenario_index" not in st.session_state:
    st.session_state.current_scenario_index = 0


# ---------- LANDING PAGE ----------

if not st.session_state.game_started:

    st.title("Financial Life Simulator")

    st.write("A quick financial decision game. Your choices shape your financial future.")

    if st.button("Start Game"):
        st.session_state.game_started = True
        st.rerun()

# ---------- SETUP PAGE ----------

elif "player_name" not in st.session_state:

    st.header("Player Setup")

    name = st.text_input("Enter your name")
    money = st.number_input("Starting Money", value=10000)

    if st.button("Begin Simulation"):

        st.session_state.player_name = name
        st.session_state.savings = money
        st.session_state.debt = 0
        st.session_state.investments = 0
        st.session_state.score = 0
        st.session_state.selected_scenarios = get_game_scenarios()
        st.session_state.current_scenario_index = 0

        st.rerun()

# ---------- GAME SCREEN ----------

elif st.session_state.current_scenario_index < len(st.session_state.selected_scenarios):

    scenario = st.session_state.selected_scenarios[
        st.session_state.current_scenario_index
    ]

    st.header(scenario["title"])
    st.write(scenario["description"])

    col1, col2, col3, col4 = st.columns(4)

    col1.metric("Savings", st.session_state.savings)
    col2.metric("Debt", st.session_state.debt)
    col3.metric("Investments", st.session_state.investments)
    col4.metric("Score", st.session_state.score)

    st.subheader("Choose an option")

    for option in scenario["options"]:

        if st.button(option["text"]):

            state = {
                "savings": st.session_state.savings,
                "debt": st.session_state.debt,
                "investments": st.session_state.investments,
                "score": st.session_state.score,
            }

            updated = apply_decision(state, option)

            st.session_state.savings = updated["savings"]
            st.session_state.debt = updated["debt"]
            st.session_state.investments = updated["investments"]
            st.session_state.score = updated["score"]

            st.session_state.current_scenario_index += 1

            st.rerun()

# ---------- RESULTS PAGE ----------

else:

    st.title("Game Results")

    final_score = calculate_final_score(
        st.session_state.savings,
        st.session_state.debt,
        st.session_state.investments,
        st.session_state.score,
    )

    evaluation = evaluate_score(final_score)

    st.metric("Final Savings", st.session_state.savings)
    st.metric("Final Debt", st.session_state.debt)
    st.metric("Investment Value", st.session_state.investments)
    st.metric("Financial Score", final_score)

    st.subheader(evaluation)

    if st.button("Play Again"):
        for key in list(st.session_state.keys()):
            del st.session_state[key]

        st.rerun()