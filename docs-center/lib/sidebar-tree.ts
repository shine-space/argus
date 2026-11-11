import type { Folder, Node, Root } from 'fumadocs-core/page-tree';

function simplifyFolder(node: Node): Node {
  if (node.type !== 'folder') return node;
  if (node.index && node.children.length === 0) return node.index;
  return { ...node, children: node.children.map(simplifyFolder) };
}

export function groupSidebar(tree: Root): Root {
  const children: Node[] = [];
  let section: Folder | undefined;

  for (const node of tree.children) {
    if (node.type === 'separator' && node.name) {
      section = {
        type: 'folder',
        $id: node.$id,
        name: node.name,
        children: [],
      };
      children.push(section);
      continue;
    }

    (section?.children ?? children).push(simplifyFolder(node));
  }

  return { ...tree, children };
}

