KEY_COUNT = "/N_LEAVES_RECURSIVE"

# ------------------------------------------------------------------------------
def count_leaves(tree: dict[str, list|dict]) -> int:
    def increment_count(path: list[str]) -> None:
        current = root
        for key in path:
            current[KEY_COUNT] += 1
            current = current[key]

    root = tree["data/"]
    queue_node = [root]
    queue_paths = [[]]

    while queue_node:
        node = queue_node.pop()
        path = queue_paths.pop()

        if KEY_COUNT not in node:
            node[KEY_COUNT] = 0

        for key,child_node in node.items():
            if key == KEY_COUNT: continue

            child_path = path + [key]

            if isinstance(child_node, list):
                increment_count(child_path)
                continue

            if isinstance(child_node, dict):
                queue_node.append(child_node)
                queue_paths.append(child_path)
                continue

            raise ValueError(f"Unexpected value type: {type(child_node)}")

    return node[KEY_COUNT]


# ------------------------------------------------------------------------------
