const Discord = require('discord.js');
const bot = new Discord.Client();
const colors = require('./colors.json');
const botconfig = require('./botconfig.json');
const moment = require('moment')
require('moment-duration-format')
const fs = require("fs");

var version = 'Version 1.1.1'

var roles = ['Discord Employee', 'Discord Partner', 'HypeSquad Events', 'Bug Hunter 1', 'House Bravery', 'House Brilliance', 'House Balance', 'Early Supporter', 'Team User', 'Discord System', 'Bug Hunter 2', 'Verified Bot Dev']

const PREFIX = 'f!';

bot.on('ready', () =>{
    console.log('BOT SUCCESSFULLY STARTED');
    //bot.user.setActivity('github.com/Salty-Soder', {type: 'PLAYING'}).catch(console.error)
})




bot.on('guildMemberAdd', member =>{

    roles.forEach(function(entry){
        let role1 = member.guild.roles.cache.find(x => x.name == entry)
        if(!role1) return
    })
    if(member.flags == 0) return
    if(member.flags == 1<<0) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[0]))
    if(member.flags == 1<<1) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[1]))
    if(member.flags == 1<<2) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[2]))
    if(member.flags == 1<<3) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[3]))
    if(member.flags == 1<<6) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[4]))
    if(member.flags == 1<<7) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[5]))
    if(member.flags == 1<<8) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[6]))
    if(member.flags == 1<<9) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[7]))
    if(member.flags == 1<<10) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[8]))
    if(member.flags == 1<<12) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[9]))
    if(member.flags == 1<<14) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[10]))
    if(member.flags == 1<<17) return member.roles.add(member.guild.roles.cache.find(x => x.name == roles[11]))
})


bot.on('message', async message=>{





    if(!message.content.startsWith(PREFIX)) return;
    let args = message.content.substring(PREFIX.length).split(" ")
    let command = args.shift()

    if (!message.guild.me.hasPermission("SEND_MESSAGES")){
        message.channel.type === (`"dm"`) + message.author.send(`Hey there. Just dropped by to tell you that I dont have permission to chat on "${guild.name}", therefore I cant say anything...`)
        return;
    }



    switch(command){


        case 'help':
            helps = ["setup", "assign", "lightmode", "info", "uptime", ]
            fsetup = "f!setup is used to create all flag roles and assign them!"
            fassign = "f!assign is used to assign roles manually if the automation isn't working"
            flightmode = "f!lightmode is used to call out people using lightmode"
            finfo = "f!info is used to find information about the bot, e.g. f!info version"
            fuptime = "f!uptime is used to see how long I have been online for!"
            if(!args[0]){
               let helpEmbed = new Discord.MessageEmbed()
                .setColor("#23afcf")
                .setTitle("Flagifier Help")
                .setThumbnail(bot.user.displayAvatarURL)
                .addField("***General: ***", 'f!setup f!assign f!lightmode', true)
                .addField("***Info: ***", 'f!info version f!uptime', true)
                .setFooter(`Flagifier Help`, bot.user.displayAvatarURL);
                message.channel.send({embed: helpEmbed})
            }
            /*if(helps.includes(args[0]) || helps.includes(args[0].split("!")[1])){
                if(args[0])
                message.channel.send(res)
            }*/
            break;


        case 'ping':
            
            ping_msg = await message.channel.send(`🏓 Pinging...`)
    
            ping_msg.edit(`🏓 Pong!\nLatency is ${Math.floor(ping_msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Latency is ${Math.round(bot.ws.ping)}ms`);
            break;


        case 'info':
            if(args[0] === 'version'){
                message.channel.send(version)
            }else if(args[0] == 'creator'){
                message.channel.send("Salty-Coder\n(https://github.com/Salty-Coder)")
            }
            
            break;

        case 'creator':
            if(message.author.id === "409250840571019264"){
                message.channel.send("Yes you are the creator. Salty-Coder")
            }else{
                message.channel.send("Bro you are not my creator so dont pretend you are!")
            }
                
            break;


        case 'setup':
            if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have permission to manage roles...")

            let employeeRole = 'Discord Employee'
            let PartnerRole = 'Discord Partner'
            let HSERole = 'HypeSquad Events'
            let BH1Role = 'Bug Hunter 1'
            let BraveryRole = 'House Bravery'
            let BrillianceRole = 'House Brilliance'
            let BalanceRole = 'House Balance'
            let ESupporterRole = 'Early Supporter'
            let TeamUserRole = 'Team User'
            let SystemRole = 'Discord System'
            let BH2Role = 'Bug Hunter 2'
            let VBDevRole = 'Verified Bot Dev'

            let NCRole = 'Nitro Classic'
            let NitroRole = 'Nitro'

            

            roles.forEach(function(entry){
                let role1 = message.guild.roles.cache.find(x => x.name == entry)
                if(!role1){
                    let theRole = message.guild.roles.create({
                        data:{
                            name: entry,
                            color: colors[entry]
                        }
                    })
                }
            })
            
            let setupEmbed = new Discord.MessageEmbed()
            .setTitle("Flagifier Setup!")
            .setColor("#3dd20f")
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription("All roles have been successfully setup! Unfortunately you will need to manually set the attribute of display role members separately")
            .setFooter(`Flagifier`, bot.user.displayAvatarURL);
            message.channel.send(setupEmbed);

            addRoles(message)
            break;


        case 'assign':
            addRoles(message)
            break;
            
            
        case 'uptime':
            message.channel.send("The uptime is **" + moment.duration(bot.uptime).format(' D [days], H [hrs], m [mins], s [secs]') + "**")
            break;


    }

})




async function addRoles(message){

    var rolesmsg = await message.channel.send("Adding Roles...");
                
    let count = 0

    message.guild.members.cache.forEach(member1 =>{
        count = count + 1
        if(member1.user.bot) return
        if(member1.user.flags == 1<<0) return member1.roles.add(member1.guild.roles.cache.find(x => x.name == roles[0]))
        if(member1.user.flags == 1<<1) return member1.roles.add(member1.guild.roles.cache.find(x => x.name == roles[1]))
        if(member1.user.flags == 1<<2) return member1.roles.add(member1.guild.roles.cache.find(x => x.name == roles[2]))
        if(member1.user.flags == 1<<3) return member1.roles.add(member1.guild.roles.cache.find(x => x.name == roles[3]))
        if(member1.user.flags == 1<<6) return member1.roles.add(message.guild.roles.cache.find(x => x.name == roles[4]))
        if(member1.user.flags == 1<<7) return member1.roles.add(message.guild.roles.cache.find(x => x.name == roles[5]))
        if(member1.user.flags == 1<<8) return member1.roles.add(member1.guild.roles.cache.find(x => x.name == roles[6]))
        if(member1.user.flags == 1<<9) return member1.roles.add(member1.guild.roles.cache.find(x => x.name == roles[7]))
        if(member1.user.flags == 1<<10) return member1.roles.add(member1.guild.roles.cache.find(x => x.name == roles[8]))
        if(member1.user.flags == 1<<12) return member1.roles.add(member1.guild.roles.cache.find(x => x.name == roles[9]))
        if(member1.user.flags == 1<<14) return member1.roles.add(member1.guild.roles.cache.find(x => x.name == roles[10]))
        if(member1.user.flags == 1<<17) return member1.roles.add(member1.guild.roles.cache.find(x => x.name == roles[11]))
    })

    let rolesEmbed = new Discord.MessageEmbed()
    .setTitle("Roles Added!")
    .setColor("#667db2")
    .setThumbnail(bot.user.displayAvatarURL)
    .setDescription("All roles have been rightfully granted!")
    .setFooter(`Assigned roles to ${count}/${bot.guilds.cache.get(message.guild.id).memberCount} members | Flagifier`, bot.user.displayAvatarURL);
    rolesmsg.delete()
    message.channel.send(rolesEmbed)
}










bot.login(botconfig.token);