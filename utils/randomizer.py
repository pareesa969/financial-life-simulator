import random

def select_random_scenarios(scenarios, count=4):
    """
    Randomly shuffle scenarios and return selected ones.
    """
    random.shuffle(scenarios)
    return scenarios[:count]