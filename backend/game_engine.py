def apply_decision(state, option):
    """
    Update player financial state based on chosen option
    """

    state["savings"] += option["savings"]
    state["debt"] += option["debt"]
    state["investments"] += option["investments"]
    state["score"] += option["score"]

    return state