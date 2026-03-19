def calculate_final_score(savings, debt, investments, score):

    final_score = savings + (investments * 1.5) - debt + score

    return final_score


def evaluate_score(score):

    if score < 5000:
        return "Poor financial decisions"

    elif score <= 10000:
        return "Average financial management"

    else:
        return "Strong financial management"