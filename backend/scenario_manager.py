from data.scenarios import scenarios
from utils.randomizer import select_random_scenarios


def get_game_scenarios():
    """
    Returns 4 random scenarios for the game
    """
    return select_random_scenarios(scenarios, 4)