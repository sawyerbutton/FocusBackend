import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import { CreateBlockDto} from "./DTO/create-Block.dto";
import {BlockService} from "./block.service";
// import {Roles} from "../shared/Guards/roles.decorator";
// import { UseGuards} from "@nestjs/common";
// import {RolesGuard} from "../shared/Guards/roles.guard";

@Controller('block')
// @UseGuards(RolesGuard)
export class BlockController {
    constructor(
        private blockService: BlockService
    ){}

    @Get()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getAllBlock(){
        const msg = await this.blockService.getAllBlock();
        return msg;
    }

    @Get(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getBlock(@Param() params){
        const msg = await this.blockService.getBlock(params.id);
        return msg;
    }

    @Post()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async addBlock(@Body() block:CreateBlockDto){
        const msg = await this.blockService.addBlock(block);
        return msg;
    }

    @Patch(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async updateBlock(@Param() params,@Body() newBlock: CreateBlockDto){
        const msg = await this.blockService.updateBlock(params.id,newBlock);
        return msg;
    }

    @Delete(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async deleteBlock(@Param() params){
        const msg = await this.blockService.deleteBlock(params.id);
        return msg;
    }

    @Get('community/:id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getBlockByCommunity(@Param() params){
        const msg = await this.blockService.getBlockByCommunity(params.id);
        return msg;
    }
}