import { LoadMapItem } from './LoadMapItem';

export class LoadMap {
    loadMapItems: LoadMapItem[] = [];

    get mainLoadMapItem(): LoadMapItem | undefined {
        return this.loadMapItems.find(
            (item) => !item.relation && !item.parentLoadMapItem
        );
    }

    addLoadMap(newLoadMap: LoadMapItem) {
        const item = this.loadMapItems.find(
            (item) => item.target === newLoadMap.target && item.id === newLoadMap.id
        );
        if (!item)
            this.loadMapItems.push(newLoadMap);
    }

    fillEntities(target: Function | string, entities: any[]) {
        entities.forEach((entity) => {
            const item = this.loadMapItems.find((loadMapItem) => {
                return (
                    loadMapItem.target === target &&
                    loadMapItem.metadata.compareEntities(
                        entity,
                        loadMapItem.plainEntity
                    )
                );
            });
            if (item)
                item.entity = entity;
        });
    }

    groupByTargetIds(): { target: Function | string; ids: any[]; }[] {
        const groups: { target: Function | string; ids: any[]; }[] = [];
        this.loadMapItems.forEach((loadMapItem) => {
            let group = groups.find(
                (group) => group.target === loadMapItem.target
            );
            if (!group) {
                group = { target: loadMapItem.target, ids: [] };
                groups.push(group);
            }

            group.ids.push(loadMapItem.id);
        });
        return groups;
    }
}
